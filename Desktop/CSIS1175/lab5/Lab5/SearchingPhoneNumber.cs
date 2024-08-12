using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneDirectory
{
    partial class Directory
    {

        public static string searchPhoneNumber(Directory[] friendArray, string searchItem)
        {
            string phoneNumber = "None";
            for (int rows = 0; rows <= 2; rows++)

            {
                if (friendArray[rows].name == searchItem)
                {
                    phoneNumber = friendArray[rows].phoneNumber;
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
