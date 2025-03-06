import PromptPage from "./PromptPage";
import Tokens from "./Tokens";
import ApiKeyPage from "./ApiKeyPage"
import Start_Stop_Bot from "./Start-StopBot";
import ChangeModel from "./Change model";
function Home() {
  return (
    <>
        <Start_Stop_Bot/>
        <ChangeModel/>
        <ApiKeyPage/>
        <Tokens/>
        <PromptPage/>
    </>
  );
}

export default Home;
