using adminSystem.data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adminSystem.data.EF.repository
{
    public interface IRepository<TEntity> where TEntity :class
    {
        IQueryable<TEntity> Table { get;}
       void insert(TEntity entity);
        void delete(TEntity entity);
       void update(TEntity entity);
        TEntity getById(object id);
        int Count { get; }
    }
}
