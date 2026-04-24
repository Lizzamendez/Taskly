using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskLy.Api.Data;
using TaskLy.Api.Models;

namespace TaskLy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tarefas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> ObterTarefas()
        {
            return await _context.Tarefas.ToListAsync();
        }

        // GET: api/tarefas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarefa>> ObterTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            
            if (tarefa == null)
                return NotFound(new { message = "Tarefa não encontrada" });
            
            return tarefa;
        }

        // POST: api/tarefas
        [HttpPost]
        public async Task<ActionResult<Tarefa>> CriarTarefa(Tarefa tarefa)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            tarefa.DataDeCriacao = DateTime.Now;
            tarefa.Status = string.IsNullOrEmpty(tarefa.Status) ? "Pendente" : tarefa.Status;
            
            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(ObterTarefa), new { id = tarefa.Id }, tarefa);
        }

        // PUT: api/tarefas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarTarefa(int id, Tarefa tarefa)
        {
            if (id != tarefa.Id)
                return BadRequest(new { message = "ID não coincide" });
            
            _context.Entry(tarefa).State = EntityState.Modified;
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tarefas.Any(e => e.Id == id))
                    return NotFound(new { message = "Tarefa não encontrada" });
                throw;
            }
            
            return NoContent();
        }

        // DELETE: api/tarefas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            
            if (tarefa == null)
                return NotFound(new { message = "Tarefa não encontrada" });
            
            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}