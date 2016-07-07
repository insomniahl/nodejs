var student = require('./student');
var teacher = require('./teacher');

teacher.add("hl");

function add(teacherName, students) {
    teacher.add(teacherName);
    students.forEach(function(value, index) {
        student.add(value);
    })
}

module.exports.add = add;