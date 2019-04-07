using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Server.Migrations
{
    public partial class CriacaoTabelaDisciplinas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CursoId",
                table: "Disciplinas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CursoId",
                table: "Disciplinas",
                nullable: false,
                defaultValue: 0);
        }
    }
}
