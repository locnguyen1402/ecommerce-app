import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

const ToggleTheme = () => {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <Text>
        {isDarkColorScheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Text>
      <Button onPress={toggleColorScheme} variant="outline">
        <Text>
          {isDarkColorScheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </Button>
    </>
  );
};

export default ToggleTheme;
