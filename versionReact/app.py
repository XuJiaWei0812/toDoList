from pickle import FALSE, TRUE
from flask import Flask, jsonify, request
import pymysql
from flask_bcrypt import Bcrypt
from sqlalchemy import false
from connect import Connect
import  datetime 

app = Flask(__name__)
connect = Connect()
bcrypt = Bcrypt()
dataTime=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@app.route('/login', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        con, cursor = connect.get_sql_conn()
        sql = "SELECT * FROM users WHERE email=%s"
        tuple = (request.json['email'])
        user = connect.get_dict_data_sql(cursor, sql, tuple)
        print(user)
        if user:
            if bcrypt.check_password_hash(user[0]['password'], request.json['password']):
                return jsonify(user)
            else:
                return 'False'
        else:
            return 'False'

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        con, cursor = connect.get_sql_conn()
        password=bcrypt.generate_password_hash(request.json['password'])
        sql = "INSERT ignore INTO users (email, password, created_at,updated_at) VALUES (%s,%s,%s,%s)"
        tuple = (request.json['email'],password,dataTime,dataTime)
        res=cursor.execute(sql,tuple)
        con.commit()
        if res==0:
            return 'False'
        else:
            return 'True'

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'POST':
        con, cursor = connect.get_sql_conn()
        sql = "SELECT * FROM tasks WHERE userId=%s"
        tuple = (request.json['userId'])
        tasks = connect.get_dict_data_sql(cursor, sql,tuple)
        print(tasks)
        if tasks:
            return jsonify(tasks)
        else:
            return 'False'
            
@app.route('/task/<int:id>', methods=['PUT'])
def update(id):
        con, cursor = connect.get_sql_conn()
        sql = "UPDATE tasks SET title=%s, content=%s, schedule=%s ,updatedAt=%s WHERE id=%s AND userId=%s"
        tuple = (request.json['title'],request.json['content'],request.json['schedule'],dataTime,id,request.json['userId'])
        res=cursor.execute(sql,tuple)
        con.commit()
        if res==0:
            return 'False'
        else:
            return 'True'

@app.route('/task/<int:id>', methods=['DELETE'])
def delete(id):
        con, cursor = connect.get_sql_conn()
        sql = "DELETE FROM tasks WHERE id=%s AND userId=%s"
        tuple = (id,request.json['userId'])
        res=cursor.execute(sql,tuple)
        con.commit()
        if res==0:
            return 'False'
        else:
            return 'True'

@app.route('/task', methods=['POST'])
def add():
        con, cursor = connect.get_sql_conn()
        sql = "INSERT ignore INTO tasks (userId,title,content,createdAt,updatedAt) VALUES (%s,%s,%s,%s,%s)"
        tuple = (request.json['userId'],request.json['title'],request.json['content'],dataTime,dataTime)
        res=cursor.execute(sql,tuple)
        con.commit()
        if res==0:
            return 'False'
        else:
            return 'True'

if __name__ == "__main__":
    app.run('127.0.0.1', port=5000, debug=True)
