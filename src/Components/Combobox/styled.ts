import styled from "styled-components";

export const Combobox_ = styled.div<{ $isOpen?: boolean }>`
    user-select: none;
    position: relative;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border: 2px solid #e0e0e0;
    transition: all 0.2s ease;
    cursor: pointer;
    padding: 12px 16px;
    padding-right: 40px;
    display: flex;
    align-items: center;
    width: fit-content;
    min-width: 200px;
    box-sizing: border-box;

    &::after {
        content: '';
        position: absolute;
        right: 14px;
        top: 50%;
        width: 8px;
        height: 8px;
        border-right: 2px solid #666;
        border-bottom: 2px solid #666;
        transform: translateY(-60%) rotate(${props => props.$isOpen ? '-135deg' : '45deg'});
        transition: transform 0.2s ease;
    }

    &:hover {
        border-color: #28a745;
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.15);

        &::after {
            border-color: #28a745;
        }
    }

    &:focus-within {
        border-color: #28a745;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.15);
    }
`;

export const Options_ = styled.div`
    border-radius: 10px;
    z-index: 100;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
    top: calc(100% + 8px);
    left: 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 2px solid #e0e0e0;
    animation: fade-in 0.2s ease-out;

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
    }
`;

export const Option_ = styled.div`
    padding: 12px 16px;
    transition: all 0.15s ease;
    background-color: white;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;

    &:hover {
        background-color: #e8f5e8;
        color: #1b5e20;
        padding-left: 20px;
    }

    &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
    }

    &[data-selected="true"] {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        font-weight: 500;

        &:hover {
            background: linear-gradient(135deg, #218838 0%, #1baa80 100%);
            padding-left: 20px;
        }
    }

    &:first-child {
        border-radius: 8px 8px 0 0;
    }

    &:last-child {
        border-radius: 0 0 8px 8px;
    }

    &:only-child {
        border-radius: 8px;
    }
`;
