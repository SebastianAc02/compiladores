using System;

namespace PhoneDirectory

{
    class Program
    {
        static void Main(string[] args)
        {
             Directory[] friends = new Directory[3];
           
            
            friends[0] = new Directory();
            friends[1] = new Directory();
            friends[2] = new Directory();

            friends[0].setNameAndPhoneNumber("John", "604-599-1111");
            friends[1].setNameAndPhoneNumber("Cathy", "604-599-2222");
            friends[2].setNameAndPhoneNumber("Chris", "604-599-3333");

            

             /* uses parametarized constructor
            friends[0] = new Directory("John", "604-599-1111");
            friends[1] = new Directory("Cathy", "604-599-2222");
            friends[2] = new Directory("Chris", "604-599-3333");
             */

            //Display Contents of Array
            Directory.displayArray(friends);

            //Search Items from Array

            string searchName = Directory.getSearchName();
            string phoneNumber = Directory.searchPhoneNumber(friends, searchName);
            string DisplayedMessage = Environment.NewLine + "Phone Number of " + searchName + " is: " + phoneNumber;
            Directory.displayPhoneNumber(DisplayedMessage);
            Console.ReadKey();
           return;
        }
    }

}