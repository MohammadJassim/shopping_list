# Use file-based cache for sessions (no database needed)
Rails.application.config.session_store :cache_store, 
  key: '_shopping_list_session',
  expire_after: 2.weeks