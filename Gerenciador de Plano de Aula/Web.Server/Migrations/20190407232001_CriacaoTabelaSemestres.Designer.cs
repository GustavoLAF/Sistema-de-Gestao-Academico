﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web.Server;

namespace Web.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20190407232001_CriacaoTabelaSemestres")]
    partial class CriacaoTabelaSemestres
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Web.Server.Models.Curso", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CoordenadorId");

                    b.Property<string>("Descricao")
                        .IsRequired();

                    b.Property<string>("Nome")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Cursos");
                });

            modelBuilder.Entity("Web.Server.Models.Disciplina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome")
                        .IsRequired();

                    b.Property<int>("PesoPratica");

                    b.Property<int>("PesoTeoria");

                    b.HasKey("Id");

                    b.ToTable("Disciplinas");
                });

            modelBuilder.Entity("Web.Server.Models.Semestre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Codigo")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Semestres");
                });

            modelBuilder.Entity("Web.Server.Models.Turma", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Codigo")
                        .IsRequired();

                    b.Property<int>("CursoId");

                    b.Property<int>("DisciplinaId");

                    b.Property<int>("Periodo");

                    b.Property<int>("SemestreId");

                    b.HasKey("Id");

                    b.ToTable("Turmas");
                });

            modelBuilder.Entity("Web.Server.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Cargo");

                    b.Property<string>("Cpf")
                        .IsRequired();

                    b.Property<DateTime>("DataNascimento");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Nome")
                        .IsRequired();

                    b.Property<string>("Senha")
                        .IsRequired();

                    b.Property<string>("Sobrenome")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });
#pragma warning restore 612, 618
        }
    }
}
