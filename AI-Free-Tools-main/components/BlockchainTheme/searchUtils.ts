export type SearchableTool = {
  name: string
  handle: string
  description: string
  category: string
}

const normalize = (value: string) => value.trim().toLowerCase()

const splitWords = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)

const hasWordPrefixMatch = (words: string[], query: string) =>
  words.some((word) => word.startsWith(query))

const hasTokenPrefixMatches = (words: string[], tokens: string[]) =>
  tokens.every((token) => words.some((word) => word.startsWith(token)))

export function getToolSearchScore(tool: SearchableTool, rawQuery: string): number | null {
  const query = normalize(rawQuery)
  if (!query) return 0

  const tokens = splitWords(query)
  const name = tool.name.toLowerCase()
  const handle = tool.handle.toLowerCase()
  const category = tool.category.toLowerCase()
  const description = tool.description.toLowerCase()

  const nameWords = splitWords(name)
  const primaryWords = [...nameWords, ...splitWords(handle), ...splitWords(category)]
  const shortQuery = query.length < 2

  // Strongest signals first: "a", "aa", etc should prioritize starts-with behavior.
  if (name.startsWith(query)) return 0
  if (hasWordPrefixMatch(nameWords, query)) return 1
  if (handle.startsWith(query)) return 2
  if (category.startsWith(query)) return 3
  if (tokens.length > 0 && hasTokenPrefixMatches(primaryWords, tokens)) return 4

  if (shortQuery) return null

  // Fallback broad matching for longer queries.
  if (name.includes(query)) return 5
  if (handle.includes(query)) return 6
  if (category.includes(query)) return 7
  if (description.includes(query)) return 8

  return null
}

export function rankToolsBySearch<T extends SearchableTool>(tools: T[], rawQuery: string): T[] {
  const query = normalize(rawQuery)
  if (!query) return tools

  return tools
    .map((tool, index) => {
      const score = getToolSearchScore(tool, query)
      if (score === null) return null
      return { tool, score, index }
    })
    .filter((item): item is { tool: T; score: number; index: number } => item !== null)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((item) => item.tool)
}

export function findBestToolMatch<T extends SearchableTool>(tools: T[], rawQuery: string): T | undefined {
  return rankToolsBySearch(tools, rawQuery)[0]
}
