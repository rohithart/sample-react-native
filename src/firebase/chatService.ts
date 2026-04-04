import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Firestore,
  QueryConstraint,
} from 'firebase/firestore';
import { ChatMessage } from '@types/index';
import { getFirestoreInstance } from './config';

const CHATS_COLLECTION = 'chats';

export class ChatService {
  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestoreInstance();
  }

  async sendMessage(organisationId: string, message: ChatMessage): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, CHATS_COLLECTION), {
      ...message,
      organisationId,
      timestamp: Date.now(),
    });
    return docRef.id;
  }

  subscribeToMessages(
    organisationId: string,
    onMessage: (messages: ChatMessage[]) => void
  ): () => void {
    const q = query(
      collection(this.firestore, CHATS_COLLECTION),
      where('organisationId', '==', organisationId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as ChatMessage));
      onMessage(messages);
    });

    return unsubscribe;
  }

  async deleteMessage(messageId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, CHATS_COLLECTION, messageId));
  }

  async updateMessage(messageId: string, content: string): Promise<void> {
    await updateDoc(doc(this.firestore, CHATS_COLLECTION, messageId), {
      content,
      updatedAt: Date.now(),
    });
  }
}

export const chatService = new ChatService();
