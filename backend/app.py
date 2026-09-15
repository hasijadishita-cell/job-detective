from flask import Flask,request
from flask_cors import CORS
import sqlite3
from dotenv import load_dotenv
import os 
from openai import OpenAI
import json

load_dotenv()
api_key=os.getenv("OPENAI_API_KEY")

client=OpenAI(api_key=api_key)

app= Flask(__name__)
CORS(app)

def get_db():
    conn=sqlite3.connect("job_detective.db")
    conn.row_factory=sqlite3.Row
    return conn

@app.route("/analyse", methods=["POST"])
def analyse():
    data=request.get_json()
    applications=data["applications"]
    prompt=f"""
    You are Job Detective, an AI assistant that analyses job application patterns.

    Here are the user's job applications:
    {applications}

    Analyse the applications and return ONLY valid JSON in exactly this format:
    {{
        pattern: "main pattern you notice",
        problem: "possible problem in the job search",
        recommendation: "one practical recommendation"
        }}
    Keep each value short, specific and useful.
    Do not include markdown or any text outside the JSON.
    """
    response=client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )
    analysis=json.loads(response.output_text)
    return {
        "analysis": analysis
    }

def create_table():
    conn=get_db()
    cursor=conn.cursor()

    cursor.execute("""
CREATE TABLE IF NOT EXISTS applications (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   company TEXT NOT NULL,
                   role TEXT NOT NULL,
                   jobType TEXT NOT NULL,
                   stage TEXT NOT NULL,
                   outcome TEXT NOT NULL,
                   notes TEXT
                   )
                   """)
    conn.commit()
    conn.close()
create_table()

@app.route("/")
def home():
    return "Job Detective is running"

@app.route("/applications", methods=["GET"])
def get_applications():
    db=get_db()
    rows=db.execute("SELECT * FROM applications")
    applications=[]
    for row in rows:
        applications.append(dict(row))
    db.close()
    return applications


@app.route("/applications", methods=["POST"])
def add_application():
    data=request.get_json()
    db=get_db()

    db.execute("""
INSERT INTO applications
               (company, role, jobType, stage, outcome, notes)
               VALUES(?, ?, ?, ?, ?, ?)"""
               , (
                   data["company"],
                   data["role"],
                   data["jobType"],
                   data["stage"],
                   data["outcome"],
                   data["notes"]
               ))
    db.commit()
    db.close()

    return data