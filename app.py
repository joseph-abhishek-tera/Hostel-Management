from flask import Flask, request, jsonify, render_template
from markupsafe import escape
import mysql.connector
import stripe

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this to a secret key


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/logout')
def logout():
    return render_template('login.html')

@app.route('/loginpage')
def loginpage():
    return render_template('login.html')


def home():
    return render_template('login.html')
def check_user_credentials(username, password, user_type):
    conn = mysql.connector.connect(
        host='localhost',
        user='joseph',
        password='12345',
        database='hostel'
    )
    cursor = conn.cursor()

    query = "SELECT * FROM {} WHERE name=%s AND password=%s;".format(user_type)
    cursor.execute(query, (username, password))
    user = cursor.fetchone()

    conn.close()
    return user
@app.route('/login1', methods=['POST'])
def login():
    if request.method == 'POST':
        print("Received POST request to /login") 
        username = request.form['username']
        password = request.form['password']
        user_type = request.form['userType']
        if user_type == 'administrator':
            user_type= 'admin'
        else:
            user_type = 'student'            
        user = check_user_credentials(username, password, user_type)

        if user_type=='admin' and user:
            return render_template('Adminpage.html')
        elif user_type == 'student' and user:
           return studentdetailspage()
        else:
            return jsonify({'message': 'Invalid credentials'}), 401



def studentdetailspage():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='joseph',
            password='12345',
            database='hostel',
            port='3306'
        )
    
        cursor = connection.cursor(dictionary=True)

        # Fetch all staff details from the database
        query = "SELECT id, student_name, student_place, roll_number, phone_number, year_of_studying, branch, father_name, mother_name FROM studentrg WHERE student_name IN (SELECT Name FROM student);"  # Adjust your SQL query here
        cursor.execute(query)
        student_details = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return render_template('studentpage.html', student_details=student_details)
    except mysql.connector.Error as error:
        return f"Error: {error}"

@app.route('/studentdetails')
def studentdetails():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='joseph',
            password='12345',
            database='hostel',
            port='3306'
        )
    
        cursor = connection.cursor(dictionary=True)

        # Fetch all staff details from the database
        query = "SELECT id,student_name,student_place,roll_number,phone_number,year_of_studying,branch,father_name,mother_name FROM studentrg;"  # Adjust your SQL query here
        cursor.execute(query)
        student_details = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return render_template('student-details.html', student_details=student_details)
    except mysql.connector.Error as error:
        return f"Error: {error}"

@app.route('/attendance')
def attendance():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='joseph',
            password='12345',
            database='hostel',
            port='3306'
        )
        cursor = connection.cursor(dictionary=True)

        # Fetch all staff details from the database
        query = "SELECT id,student_name,student_place,roll_number,phone_number,year_of_studying,branch,father_name,mother_name FROM studentrg;"  # Adjust your SQL query here
        cursor.execute(query)
        student_details = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return render_template('Attendance.html', student_details=student_details)
    except mysql.connector.Error as error:
        return f"Error: {error}"
@app.route('/roomdetails')
def roomdetails():
    return render_template('roomdetails.html')
@app.route('/roomAllocation')
def roomAllocation():
    return render_template("roomallocate.html")


@app.route('/messbill')
def messbill():
    return render_template("messbill.html")

@app.route('/newsnotices')
def newsnotices():
    return render_template("NewsNotices.html")


@app.route('/register1')
def register1():
    return render_template('registration.html')

@app.route('/register',methods=['POST'])
def register():
    conn = mysql.connector.connect(
        host='localhost',
        user='joseph',
        password='12345',
        database='hostel',
        port = '3306'
    )
    cursor = conn.cursor()
    if request.method == 'POST':
        student_name = request.form['studentName']
        student_place = request.form['studentPlace']
        roll_number = request.form['rollNumber']
        phone_number = request.form['phoneNumber']
        year_of_studying = request.form['yearOfStudying']
        branch = request.form['branch']
        father_name = request.form['fatherName']
        mother_name = request.form['motherName']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        if password != confirm_password:
            return "Passwords do not match. Please try again."

        # Insert into MySQL database
        sql = "INSERT INTO studentrg (student_name, student_place, roll_number, phone_number, year_of_studying, branch, father_name, mother_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val = (student_name, student_place, roll_number, phone_number, year_of_studying, branch, father_name, mother_name)

        cursor.execute(sql, val)
        conn.commit()
        conn.close()
        return render_template('payment.html')

        
@app.route('/payment')
def payment():
    return render_template('payment.html')

@app.route('/staff', methods=['GET'])
def get_staff_details():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='joseph',
            password='12345',
            database='hostel',
            port='3306'
        )
    
        cursor = connection.cursor(dictionary=True)

        # Fetch all staff details from the database
        query = "SELECT name,gender,dateofjoin,salary FROM staff;"  # Adjust your SQL query here
        cursor.execute(query)
        staff_details = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return render_template('staffdetails.html', staff_details=staff_details)
    except mysql.connector.Error as error:
        return f"Error: {error}"
@app.route('/')

@app.route('/process_payment')
def process_payment():
    return render_template("roomallocate.html")

@app.route('/add_details', methods=['POST'])
def add_details():
    if request.method == 'POST':
        connection = mysql.connector.connect(
            host='localhost',
            user='joseph',
            password='12345',
            database='hostel',
            port='3306'
        )
        name = request.form['name']
        gender = request.form['gender']
        date_of_join = request.form['date_of_join']
        salary = request.form['salary']

        cursor = connection.cursor()

        # MySQL query to insert data into the table
        insert_query = "INSERT INTO staff (name, gender, dateofjoin, salary) VALUES (%s, %s, %s, %s)"
        values = (name, gender, date_of_join, salary)

        cursor.execute(insert_query, values)
        connection.commit()
        staff_details = cursor.fetchall()
        cursor.close()
        connection.close()

        # Redirect to the main page after adding details
        return get_staff_details()

if __name__ == '__main__':
    app.run(debug=True)
