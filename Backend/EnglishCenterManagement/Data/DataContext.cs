using EnglishCenterManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EnglishCenterManagement.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserProfile> Users { get; set; }
        public DbSet<Credential> Credentials { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Avatar> Avatars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1-1 relationship User-Avatar
            modelBuilder.Entity<UserProfile>()
                .HasOne(x => x.Avatar)
                .WithOne(x => x.User)
                .HasForeignKey<Avatar>(x => x.Id);

            // 1-1 relationship User-Credential
            modelBuilder.Entity<UserProfile>()
                .HasOne(x => x.Credential)
                .WithOne(x => x.User)
                .HasForeignKey<Credential>(x => x.Id)
                .IsRequired();
        }
    }
}
