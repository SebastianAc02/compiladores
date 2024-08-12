
namespace Array2DConsoleEx1

{
    class Program
    {
        static void Main(string[] args)
        {
            string[,] friends = new string[3, 2];
            friends[0, 0] = "John";
            friends[0, 1] = "604-599-1111";
            friends[1, 0] = "Cathy";
            friends[1, 1] = "604-599-2222";
            friends[2, 0] = "Chris";
            friends[2, 1] = "604-599-3333";

            //Display Contents of Array
            Array2D.displayArray(friends);

            //Search Items from Array

            string searchName = Array2D.getSearchName();
            string phoneNumber = Array2D.searchPhoneNumber(friends, searchName);
            string DisplayedMessage = Environment.NewLine + "Phone Number of " + searchName +" is: " + phoneNumber;
            Array2D.displayPhoneNumber (DisplayedMessage);
            Console.ReadKey();
            return; 
        }
    }

}