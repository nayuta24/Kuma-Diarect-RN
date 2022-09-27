export const useFormatDoubleDigits = ( num: number) =>
{
    const formted = ("0" + (num + 1)).slice(-2);
    return formted;
}
