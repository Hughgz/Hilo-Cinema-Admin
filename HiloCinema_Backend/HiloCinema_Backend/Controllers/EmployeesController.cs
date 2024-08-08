using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HiloCinema_Backend.Model;
using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Helper;

namespace HiloCinema_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly HiloCinemaContext _context;

        public EmployeesController(HiloCinemaContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromBody] EmployeeDTO updatedEmployee)
        {
            if (id != updatedEmployee.Id)
            {
                return BadRequest(new { message = "Employee ID mismatch." });
            }

            var existingEmployee = await _context.Employees.FindAsync(id);
            if (existingEmployee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            // Cập nhật các thuộc tính của nhân viên hiện tại từ DTO
            existingEmployee.Name = updatedEmployee.Name;
            existingEmployee.Email = updatedEmployee.Email;
            existingEmployee.Address = updatedEmployee.Address;
            existingEmployee.Phone = updatedEmployee.Phone;
            existingEmployee.Gender = updatedEmployee.Gender;
            existingEmployee.Birthdate = updatedEmployee.Birthdate;
            existingEmployee.Password = PasswordHasher.HashPassword(updatedEmployee.Password);
            existingEmployee.Position = updatedEmployee.Position;
            existingEmployee.SysRole = updatedEmployee.SysRole;
            existingEmployee.Token = updatedEmployee.Token;
            existingEmployee.CreatedDate = updatedEmployee.CreatedDate;
            existingEmployee.Status = updatedEmployee.Status;

            _context.Entry(existingEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound(new { message = "Employee not found." });
                }
                else
                {
                    return BadRequest(new { message = ex.Message });
                }
            }

            return Ok(new { message = "Cập nhật thông tin nhân viên thành công", employee = existingEmployee });
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
