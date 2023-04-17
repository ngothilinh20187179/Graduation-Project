using EnglishCenterManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EnglishCenterManagement.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserInfoModel> Users { get; set; }
        public DbSet<TokenModel> TokenModel { get; set; }
        public DbSet<CredentialModel> Credentials { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<AvatarModel> Avatars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1-1 relationship User-Avatar
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Avatar)
                .WithOne(x => x.User)
                .HasForeignKey<AvatarModel>(x => x.Id);

            // 1-1 relationship User-Credential
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Credential)
                .WithOne(x => x.User)
                .HasForeignKey<CredentialModel>(x => x.Id)
                .IsRequired();
            
            // 1-1 relationship User-Token
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Token)
                .WithOne(x => x.User)
                .HasForeignKey<TokenModel>(x => x.UserId);
        }
    }
}
