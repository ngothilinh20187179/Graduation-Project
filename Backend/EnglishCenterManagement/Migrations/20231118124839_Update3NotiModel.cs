using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class Update3NotiModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsMarked",
                table: "Notifications",
                newName: "IsMarkedSenderNoti");

            migrationBuilder.AddColumn<bool>(
                name: "IsMarkedReceiverNoti",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "IsReceiverDeleteNoti",
                table: "Notifications",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "IsSenderDeleteNoti",
                table: "Notifications",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMarkedReceiverNoti",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "IsReceiverDeleteNoti",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "IsSenderDeleteNoti",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "IsMarkedSenderNoti",
                table: "Notifications",
                newName: "IsMarked");
        }
    }
}
