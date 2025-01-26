import { useModal } from "./useModal";

export const useModalManager = (modalKeys = []) => {
    // modalKeys 배열을 기반으로 각 모달 상태 관리
    const modals = modalKeys.reduce((acc, key) => {
        acc[key] = useModal(); // 각 모달의 상태를 useModal 훅으로 생성
        return acc;
    }, {});

    return modals;
};