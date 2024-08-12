using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneDirectory
{
    public partial class Directory
    {
                      
        public Directory()
        {
            //Constructor
            Console.WriteLine ("Object is being created");
        }

        //Store  name and phoneNumber Information using parameterized constructors
        public Directory (String n, string p)
        {

            name = n;
            phoneNumber = p;
        }

        ~Directory ()

        {   //destructor
            Console.WriteLine("Object is being deleted");
        }

    }
}
