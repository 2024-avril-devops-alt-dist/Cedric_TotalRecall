// app/utils/reponse.ts
import { NextResponse } from 'next/server';

export function handleError(error: unknown, collection: string) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch ${collection}: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: `Failed to fetch ${collection}: Unexpected error` },
        { status: 500 }
      );
    }
  }