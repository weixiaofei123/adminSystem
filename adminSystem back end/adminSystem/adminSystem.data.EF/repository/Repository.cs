using adminSystem.data.EF;
using adminSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adminSystem.data.EF.repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private adminSystemContext _adminSystemContext;
        public Repository(adminSystemContext adminSystemContext)
        {
            _adminSystemContext = adminSystemContext;
        }

        public IQueryable<TEntity> Table
        {
            get { return _adminSystemContext.Set<TEntity>(); }

        }
        public int Count{
            get{ return _adminSystemContext.Set<TEntity>().Count(); }
            }

        public void delete(TEntity entity)
        {
            _adminSystemContext.Set<TEntity>().Remove(entity);
            _adminSystemContext.SaveChanges();
            
        }

        public TEntity getById(object id)
        {
           return _adminSystemContext.Set<TEntity>().Find(id);
        }

        public void insert(TEntity entity)
        {
            _adminSystemContext.Set<TEntity>().Add(entity);
            _adminSystemContext.SaveChanges();
        }

        public void update(TEntity entity)
        {
            _adminSystemContext.Set<TEntity>().Update(entity);
            _adminSystemContext.SaveChanges();
        }
    }
}
