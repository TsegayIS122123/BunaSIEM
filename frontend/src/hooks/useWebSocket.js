import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url, options = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  const {
    onMessage = () => {},
    onOpen = () => {},
    onClose = () => {},
    onError = () => {},
    autoReconnect = true,
    reconnectInterval = 3000
  } = options;

  const connect = () => {
    try {
      console.log(`🔌 Connecting to WebSocket: ${url}`);
      ws.current = new WebSocket(url);

      ws.current.onopen = (event) => {
        console.log('✅ WebSocket connected successfully');
        setIsConnected(true);
        setNewMessagesCount(0);
        onOpen(event);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message received:', data.type);
          
          setMessages(prev => [data, ...prev]);
          setNewMessagesCount(prev => prev + 1);
          
          // Auto-clear counter after 3 seconds
          setTimeout(() => setNewMessagesCount(0), 3000);
          
          onMessage(data);
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = (event) => {
        console.log('🔌 WebSocket disconnected');
        setIsConnected(false);
        onClose(event);

        // Auto-reconnect
        if (autoReconnect) {
          console.log(`🔄 Attempting to reconnect in ${reconnectInterval}ms...`);
          reconnectTimeout.current = setTimeout(connect, reconnectInterval);
        }
      };

      ws.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setIsConnected(false);
        onError(error);
      };

    } catch (error) {
      console.error('❌ WebSocket connection failed:', error);
    }
  };

  const disconnect = () => {
    if (ws.current) {
      ws.current.close();
    }
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }
  };

  const sendMessage = (message) => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket not connected, cannot send message');
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setNewMessagesCount(0);
  };

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [url]);

  return {
    isConnected,
    messages,
    newMessagesCount,
    sendMessage,
    disconnect,
    connect,
    clearMessages
  };
};

export default useWebSocket;