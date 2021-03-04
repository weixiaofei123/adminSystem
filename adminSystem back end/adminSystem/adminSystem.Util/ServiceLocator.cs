using System;
using System.Collections.Generic;
using System.Text;

namespace adminSystem.Util
{
    public static class ServiceLocator
    {
        public static IServiceProvider Instance { get; set; }
    }
}
