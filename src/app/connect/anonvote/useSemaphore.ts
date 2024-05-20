import { Group } from "@semaphore-protocol/group"

export async function getRoot(
  groupId: string,
  treeDepth: number,
  members: string[]
) {
  const group = new Group(groupId, treeDepth, members)
  return group.root
}
