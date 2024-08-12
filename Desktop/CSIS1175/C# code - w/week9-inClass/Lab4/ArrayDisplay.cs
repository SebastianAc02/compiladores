using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Array2DConsoleEx1
{
    partial class Array2D
    {
        public static void displayArray(string[,] friendArray)
        {
            Console.WriteLine("Name" + "\t" + "Phone #");
            //Display each item separately
            Console.WriteLine(friendArray[0, 0] + "\t " + friendArray[0, 1]);
            Console.WriteLine(friendArray[1, 0] + "\t " + friendArray[1, 1]);
            Console.WriteLine(friendArray[2, 0] + "\t " + friendArray[2, 1]);
            Console.WriteLine("*********");

            //Display array using loop

            for (int rows = 0; rows <= 2; rows++)

            {
                Console.WriteLine(friendArray[rows, 0] + "\t " + friendArray[rows, 1]);
            }

            Console.WriteLine("*********");
            return;


        }
    }
}

