#include <iostream>
using namespace std;
main() {
    int numbers[] = {10, 20, 30, 40, 50, 60, 70};
    int target = 50;
    int left = 0;
    int right = 6;

    while (left <= right) {
        int middle = (left + right) / 2;

        if (numbers[middle] == target) {
            cout << "Number Found!";
            break;
        }
        else if (numbers[middle] < target) {
            left = middle + 1;
        }
        else {
            right = middle - 1;
        }
    }}