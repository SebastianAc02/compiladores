using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneDirectory
{
  
    
        partial class Directory
        {
            public static void displayArray(Directory [] friendArray)
            {
                Console.WriteLine("Name" + "\t" + "Phone #");
                

                //Display each item separately
                Console.WriteLine(friendArray[0].name + "\t " + friendArray[0].phoneNumber);
                Console.WriteLine(friendArray[1].name + "\t " + friendArray[1].phoneNumber);
                Console.WriteLine(friendArray[2].name + "\t " + friendArray[2].phoneNumber);
                Console.WriteLine("*********");
                

                //Display array using loop

                for (int rows = 0; rows <= 2; rows++)

                {
                    Console.WriteLine(friendArray[rows].name + "\t " + friendArray[rows].phoneNumber);
                }

                Console.WriteLine("*********");
                return;


            }
        }
    }
