import { ApiError } from "../errors/api-error";

interface ParseIssue {
  message: string;
}

interface ParseSuccess<TParsedData> {
  success: true;
  data: TParsedData;
}

interface ParseFailure {
  success: false;
  error: {
    issues: ParseIssue[];
  };
}

interface ParseableSchema<TParsedData> {
  safeParse: (value: unknown) => ParseSuccess<TParsedData> | ParseFailure;
}

export const parseBody = <TParsedData>(
  schema: ParseableSchema<TParsedData>,
  body: unknown
): TParsedData => {
  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    throw new ApiError(400, firstIssue?.message ?? "Invalid request body");
  }

  return parseResult.data;
};
