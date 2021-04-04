import { useRoomChatMentionStore } from "./useRoomChatMentionStore";
import { useRoomChatStore } from "./useRoomChatStore";

export const navigateThroughQueriedUsers = (e: any) => {
  const {
    queriedUsernames,
    setMentions,
    mentions,
    setQueriedUsernames,
    activeUsername,
    setActiveUsername,
  } = useRoomChatMentionStore.getState();
  const { message, setMessage } = useRoomChatStore.getState();

  // Use dom method, GlobalHotkeys apparently don't catch arrow-key events on inputs
  if (
    !["ArrowUp", "ArrowDown", "Enter"].includes(e.code) ||
    !queriedUsernames.length
  ) {
    return;
  }

  e.preventDefault();

  let changeToIndex: number | null = null;
  const activeIndex = queriedUsernames.findIndex(
    (username) => username.id === activeUsername
  );

  if (e.code === "ArrowUp") {
    changeToIndex =
      activeIndex === 0 ? queriedUsernames.length - 1 : activeIndex - 1;
  } else if (e.code === "ArrowDown") {
    changeToIndex =
      activeIndex === queriedUsernames.length - 1 ? 0 : activeIndex + 1;
  } else if (e.code === "Enter") {
    const selected = queriedUsernames[activeIndex];
    setMentions([...mentions, selected]);
    setMessage(
      `${message.substring(0, message.lastIndexOf("@") + 1)}${
        selected.username
      } `
    );
    setQueriedUsernames([]);
  }

  // navigate to next/prev mention suggestion item
  if (changeToIndex !== null) {
    setActiveUsername(queriedUsernames[changeToIndex]?.id);
  }
};
