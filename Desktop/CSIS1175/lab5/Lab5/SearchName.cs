﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneDirectory
{
    partial class Directory
    {

        public static string getSearchName()
        {
            Console.Write("Enter the name of the user whose Phone Number you want to find: ");
            string userName = Console.ReadLine();
            return (userName);


        }
    }
}
