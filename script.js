let students = JSON.parse(localStorage.getItem('students')) || [];

function renderStudents() {
  const list = document.getElementById('studentList');
  list.innerHTML = '';
  students.forEach((student, index) => {
    list.innerHTML += `
      <tr id="row-${index}">
        <td>${student.roll}</td>
        <td>${student.name}</td>
        <td>
          <button style="width: auto; background: #007bff;" onclick="markAttendance(${index}, 'Present')">P</button>
          <button style="width: auto; background: #dc3545;" onclick="markAttendance(${index}, 'Absent')">A</button>
        </td>
      </tr>
    `;
  });
}

function addStudent() {
  const name = document.getElementById('studentName').value;
  const roll = document.getElementById('rollNumber').value;
  if (name && roll) {
    students.push({ name, roll, status: 'Not Marked' });
    localStorage.setItem('students', JSON.stringify(students));
    document.getElementById('studentName').value = '';
    document.getElementById('rollNumber').value = '';
    renderStudents();
  }
}

function markAttendance(index, status) {
  students[index].status = status;
  const row = document.getElementById(`row-${index}`);
  row.className = status === 'Present' ? 'present' : 'absent';
  localStorage.setItem('students', JSON.stringify(students));
}

function viewSummary() {
  const present = students.filter(s => s.status === 'Present').length;
  const absent = students.filter(s => s.status === 'Absent').length;
  document.getElementById('summary').innerHTML = `
    <h3>Summary:</h3>
    <p>Total: ${students.length} | Present: ${present} | Absent: ${absent}</p>
  `;
}

renderStudents();

