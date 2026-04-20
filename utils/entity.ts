import { EntityType } from "@/enums";

export function resolveEntityType(entity: EntityType): string {
  switch (entity) {
    case EntityType.DOCUMENT_STORE:
      return 'document';
    case EntityType.USER_REQUEST:
      return 'request';
    default:
      return entity.toLowerCase();
  }
}