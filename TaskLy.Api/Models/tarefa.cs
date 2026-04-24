using System.ComponentModel.DataAnnotations;

namespace TaskLy.Api.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Titulo { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Descricao{ get; set; } = string.Empty;
        
        [Required]
        public string Status { get; set; } = "Pendiente"; // "Pendiente" ou "Concluída"
        
        public DateTime DataDeCriacao { get; set; } = DateTime.Now;
    }
}