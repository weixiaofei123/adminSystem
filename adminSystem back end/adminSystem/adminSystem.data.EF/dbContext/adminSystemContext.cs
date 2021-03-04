using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace adminSystem.Entities
{
    public partial class adminSystemContext : DbContext
    {
        public adminSystemContext()
        {
        }

        public adminSystemContext(DbContextOptions<adminSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AdminProduct> AdminProducts { get; set; }
        public virtual DbSet<AdminToken> AdminTokens { get; set; }
        public virtual DbSet<AdminUser> AdminUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=wxf\\STOCK;database=adminSystem;uid=wxf;pwd=123456;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Chinese_PRC_CI_AS");

            modelBuilder.Entity<AdminProduct>(entity =>
            {
                entity.ToTable("adminProducts");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EditorState)
                    .HasMaxLength(1000)
                    .IsUnicode(false)
                    .HasColumnName("editorState");

                entity.Property(e => e.ImgUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("imgURL");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.OnSale).HasColumnName("onSale");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("price");
            });

            modelBuilder.Entity<AdminToken>(entity =>
            {
                entity.ToTable("adminToken");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ExpireTime)
                    .HasColumnType("datetime")
                    .HasColumnName("expireTime");

                entity.Property(e => e.Token)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("token");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AdminTokens)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_adminToken_adminUsers1");
            });

            modelBuilder.Entity<AdminUser>(entity =>
            {
                entity.ToTable("adminUsers");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("name")
                    .IsFixedLength(true);

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("password")
                    .IsFixedLength(true);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
