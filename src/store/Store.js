
import { create } from 'zustand'

const useStore = create(set => ({
  user_id: request.json['_id'],

  inc: () => set(state => ({ count: state.count + 1 })),
}))
