import * as React from 'react';

interface Props {
    closeModal: () => void;
    handleCallToAssignee: () => Promise<void>;
}

const TaskModal: React.FC<Props> = ({ closeModal, handleCallToAssignee }) => {
    return (
        <div className="modal active" id="modal-id">
            <a className="modal-overlay" aria-label="Close"></a>
            <div className="modal-container">
                <div className="modal-header">
                    <a className="btn btn-clear float-right" aria-label="Close" onClick={() => closeModal()} />
                    <div className="modal-title h5">Make a phone call</div>
                </div>
                <div className="modal-body">
                    <div className="content">
                        Are you ready to have a call? Plase confirm.
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-link mr-2" onClick={() => closeModal()}>
                        Cancel
                    </button>
                    <button className="btn btn-success" onClick={() => handleCallToAssignee()}>
                        I&apos;m ready
                    </button>
                </div>
            </div>
        </div>
    );
};

export { TaskModal };
