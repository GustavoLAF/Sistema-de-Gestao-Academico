using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Server.Migrations
{
    public partial class AlteracaoTabelaTurma : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfessorId",
                table: "Turmas",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfessorId",
                table: "Turmas");
        }
    }
}
