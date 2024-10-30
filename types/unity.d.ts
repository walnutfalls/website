// Define a type for Unity loader status and progress callback
interface UnityProgress {
    (progress: number): void;
}

// Define the configuration for Unity instance creation
interface UnityConfig {
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    streamingAssetsUrl?: string;
    companyName: string;
    productName: string;
    productVersion: string;
    devicePixelRatio?: number;
}

// Define the return type for Unity instance
interface UnityInstance {
    Quit(): Promise<void>;
    SendMessage(objectName: string, methodName: string, value?: any): void;
}

// Declare the createUnityInstance function
declare function createUnityInstance(
    canvas: HTMLCanvasElement,
    config: UnityConfig,
    onProgress: UnityProgress
): Promise<UnityInstance>;