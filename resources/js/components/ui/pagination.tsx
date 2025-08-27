import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handlePageChange, useQueryParams } from '@/utils/data-table';
import { useState } from 'react';

interface PaginationProps {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export function Pagination({ current_page, last_page, per_page, total, from, to }: PaginationProps) {
    const [gotoPage, setGotoPage] = useState('');
    const filterParams = useQueryParams();

    if (last_page <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between gap-2 mt-6">
            <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Show:</span>
                <Select
                    value={per_page.toString()}
                    onValueChange={(value) => {
                        const newPerPage = Number(value);
                        if (!isNaN(newPerPage) && newPerPage > 0) {
                            handlePageChange(1, { ...filterParams, per_page: newPerPage });
                        }
                    }}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(current_page - 1, filterParams)}
                    disabled={current_page <= 1}
                >
                    Previous Page
                </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(current_page + 1, filterParams)}
                disabled={current_page >= last_page}
            >
                Next Page
            </Button>

            <div className="flex items-center space-x-2">
                <span>Go to page:</span>
                <Input
                    type="number"
                    min={1}
                    max={last_page}
                    value={gotoPage}
                    onChange={(e) => setGotoPage(e.target.value)}
                    className="w-20"
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const page = Number(gotoPage);
                        if (!isNaN(page) && page >= 1 && page <= last_page) {
                            handlePageChange(page, filterParams);
                        }
                    }}
                >
                    Go
                </Button>
            </div>

            <div className="ml-4 text-sm text-muted-foreground">
                Showing {from} to {to} of {total} items
            </div>
            </div>
        </div>
    );
}
