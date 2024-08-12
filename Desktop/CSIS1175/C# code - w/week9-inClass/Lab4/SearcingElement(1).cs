using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Array2DConsoleEx1
{
    partial class Array2D
    {

        public static string searchPhoneNumber(string[,] friendArray, string searchItem)
        {
            string phoneNumber = "None";
            for (int rows = 0; rows <= 2; rows++)
                
                {
                    if (friendArray[rows, 0] == searchItem)
                    {
                        phoneNumber = friendArray[rows, 1];
                    }

                }
            if (phoneNumber != "None")

                return (phoneNumber);
            else
            {
                Console.WriteLine("Name is Invalid", "Invalid Name: Name does not exist in the directory ");
                return ("Phone # Does not Exist ");
            }






        }
    }
}
