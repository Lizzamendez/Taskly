using Microsoft.EntityFrameworkCore;
using TaskLy.Api.Models;

namespace TaskLy.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<Tarefa> Tarefas { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            
            modelBuilder.Entity<Tarefa>().ToTable("Tarefas");
        }
    }
}