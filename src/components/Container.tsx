import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
      <div className="mt-14">
        {children}
      </div>
    );
};

const CenteredContainer: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='text-center'>
            {children}
        </div>
    );  
}

export { Container, CenteredContainer };