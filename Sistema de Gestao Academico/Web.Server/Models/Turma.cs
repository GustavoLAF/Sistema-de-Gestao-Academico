﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Server.Models
{
    public class Turma
    {
        public int Id { get; set; }
        [Required]
        public string Codigo { get; set; }
        [Required]
        public Periodos Periodo { get; set; }
        [Required]
        public int CursoId { get; set; }
        [Required]
        public int DisciplinaId { get; set; }
        [Required]
        public int SemestreId { get; set; }
        [Required]
        public int ProfessorId { get; set; }


        [NotMapped]
        public Curso Curso { get; set; }
        [NotMapped]
        public Disciplina Disciplina { get; set; }
        [NotMapped]
        public Semestre Semestre { get; set; }
        [NotMapped]
        public Usuario Professor { get; set; }
    }
}
