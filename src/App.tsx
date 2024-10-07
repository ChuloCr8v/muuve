import { ConfigProvider } from "antd";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./api/data/store";
import { Loading } from "./components/common/Loading";
import PageError from "./components/PageError";
import { PopupProvider } from "./context/PopupContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ErrorBoundary FallbackComponent={PageError}>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#0A96CC",
                },
                components: {
                  Form: {
                    itemMarginBottom: 16,
                  },
                  Input: {
                    activeBg: "inherit",
                  },
                },
              }}
            >
              <PopupProvider>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </PopupProvider>
            </ConfigProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
