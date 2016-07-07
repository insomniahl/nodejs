var klass = require('./klass');

module.exports.add = function (klasses) {
    klasses.forEach(function(value, index) {
        var _klass = value;
        var teacher = _klass.teacherName;
        var students = _klass.students;
        klass.add(teacher, students);
    })
    
}