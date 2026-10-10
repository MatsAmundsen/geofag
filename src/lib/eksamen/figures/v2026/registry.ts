/** Which v2026 tasks show a figure on the page, and whether it is ours. */
export function v2026FigureBadge(taskNumber: number): string {
  switch (taskNumber) {
    case 1:
    case 7:
    case 8:
    case 9:
    case 11:
    case 17:
    case 22:
      return " · egen figur";
    case 6:
      return " · original og egen figur";
    case 2:
    case 4:
    case 12:
    case 16:
    case 19:
      return " · originalfigur";
    default:
      return "";
  }
}

export function v2026HasFigure(taskNumber: number): boolean {
  return v2026FigureBadge(taskNumber) !== "";
}
