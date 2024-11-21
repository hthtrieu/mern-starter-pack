import React, { useRef, useState } from 'react';
import { getPresignedUrl } from '@/store/upload/slice';
import axios from 'axios';
import { Accept, useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import UploadPreview from './UploadPreview';

interface FileInfo {
  path: string;
}

interface FileDropzoneProps {
  placeholder: string;
  multipleFile: boolean;
  accept: string;
  name: string;
  type: string;
  classNameInput: string;
  onKeyUp: () => void;
  field: any;
  maxLength: number;
  readOnly?: boolean;
}

export const FileDropzonePresigned: React.FC<FileDropzoneProps> = ({
  placeholder,
  multipleFile,
  accept,
  name,
  type,
  classNameInput,
  onKeyUp,
  field,
  maxLength,
  readOnly = false,
}) => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onClick = () => {
    fileRef?.current?.click();
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multipleFile,
    accept: accept as unknown as Accept,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0]; // Chọn file đầu tiên nếu không cho phép nhiều file

        try {
          // Lấy presigned URL từ server
          dispatch(
            getPresignedUrl({
              data: {
                name: file.name,
                fileType: file.type,
              },
              onSuccess: async (data: { url: string }) => {
                // Upload file lên S3/MinIO qua presigned URL
                try {
                  const uploadResponse = await axios.put(data.url, file, {
                    headers: {
                      'Content-Type': file.type || 'image/*',
                    },
                  });

                  if (
                    uploadResponse.status === 200 ||
                    uploadResponse.status === 204
                  ) {
                    // Thành công, cập nhật trạng thái file đã tải lên
                    setFileInfo({
                      path: URL.createObjectURL(file), // Hiển thị preview từ local
                    });
                  }
                } catch (uploadError) {
                  console.error('Upload failed:', uploadError);
                }
              },
              onError: (error: any) => {
                console.error('Presigned URL error:', error);
              },
            }),
          );
        } catch (error) {
          console.error('Error in file upload:', error);
        }
      }
    },
  });

  return (
    <div
      {...getRootProps({
        className: `relative overflow-hidden flex flex-col items-center justify-center w-full border-[1px] rounded-lg`,
      })}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center justify-center pb-6 pt-5',
        )}
      >
        <p className="mb-[12px] text-[16px] font-bold">{placeholder}</p>
        <Button
          variant="outline"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className="w-[30%] min-w-fit rounded-sm border-[1px] border-input p-[10px] text-primary shadow-none"
        >
          {`Select image`}
        </Button>
        <input {...getInputProps()} />
      </div>
      {fileInfo && (
        <div className="h-full w-full">
          <UploadPreview show path={fileInfo.path} />
        </div>
      )}
    </div>
  );
};
