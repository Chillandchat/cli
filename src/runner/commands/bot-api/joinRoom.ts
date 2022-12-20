import CompilerError from "../../../utils/error";
import joinRoom from "../../../utils/scripts/joinRoom";
import { RuntimeInfo } from "./../../../utils/index.d";

const _joinRoom = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    let roomName: string = parameters[0];
    let roomPassword: string = parameters[1];

    if (parameters[0].includes("$")) {
      if (!runtimeInfo.stack.variableExists(parameters[0])) {
        new CompilerError(
          `${parameters[0]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      roomName = runtimeInfo.stack.getVariable(parameters[0]).value;
    }

    if (parameters[1].includes("$")) {
      if (!runtimeInfo.stack.variableExists(parameters[1])) {
        new CompilerError(
          `${parameters[1]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      roomPassword = runtimeInfo.stack.getVariable(parameters[1]).value;
    }

    joinRoom(
      JSON.parse(runtimeInfo.stack.getVariable("$!PROTECTED_USER_INFO").value)
        ?.username,
      roomName,
      roomPassword
    );
  } else {
    new CompilerError(
      "Error: Not authenticated, please authenticate using the login method first.",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default _joinRoom;